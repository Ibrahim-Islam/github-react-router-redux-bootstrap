import React, { Component } from 'react'
import './index.css'
import { Breadcrumb, 
    BreadcrumbItem, 
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Input,
    Alert
 } from 'reactstrap'
 import { Link } from 'react-router-dom'
 import Loader from '../loading'
 import { connect } from 'react-redux'
 import { getCommits, resetCommits } from '../../state/actionCreators'


const CommitItem = ({headline, message, date}) => (
    <ListGroupItem>
        <ListGroupItemHeading>
            { headline }
        </ListGroupItemHeading>
        <ListGroupItemText className="list-text">
            <label className="list-text-left">{ message }</label>
            <label className="list-text-right">{ date }</label>
        </ListGroupItemText>
    </ListGroupItem>
)

export class Commit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            commits: this.props.commitContainer.commits
        }
    }

    componentDidMount(){
        const {username, repo} = this.props.match.params
        if (this.props.commitContainer.repo.toLowerCase() !== repo) {
            this.props.resetCommits()
            this.props.getCommits(username, repo)
        }
        window.addEventListener('scroll', this._handleOnScroll)
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            commits: newProps.commitContainer.commits
        })   
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._handleOnScroll)
    }

    _handleOnScroll = () => {
        if(this.state.isSearching 
            || this.props.showLoading 
            || !this.props.commitContainer.pageInfo.hasNextPage) 
            return
        
        if (window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight)
            this.props.getCommits(this.props.match.params.username,
                this.props.match.params.repo,
                this.props.commitContainer.pageInfo.endCursor)
    }

    _onSearch = (event) => {
        const searchTerm = event.currentTarget.value
        this.setState({
            isSearching: searchTerm.length > 0,
            commits: this.props.commitContainer.commits
                .filter(commit => commit.headline.toLowerCase().includes(searchTerm))
        })
    }

    render() {
        return (
            <div className="gh-table-body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to="/">Search</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    { this.props.match.params.username }
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to="#" onClick={_ => this.props.history.goBack()}>Repositories</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    { this.props.match.params.repo }
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                    Commits
                                </BreadcrumbItem>
                            </Breadcrumb>                    
                        </div>
                    </div>
                    {
                        this.props.error.length > 0
                        ?
                        <Alert color="danger">
                            {this.props.error}
                        </Alert>
                        :
                        <div>
                            <div className="row">
                                <div className="col-lg-8">
                                    <h3>{this.props.match.params.repo}</h3>
                                </div>
                                <div className="col-lg-4">
                                    <Input onChange={this._onSearch} className="gh-search" placeholder="Enter text to search...." />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <ListGroup>
                                        { this.state.commits.map(commit => <CommitItem key={commit.id} {...commit} />) }
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    }
                    { 
                        this.props.showLoading 
                        ? 
                        <Loader /> 
                        : 
                        null 
                    }                             
                </div>
            </div>
        );
      }    
    }


export default connect(
    (state) => ({commitContainer: state.commitContainer, showLoading: state.showLoading, error: state.error}),
    {getCommits, resetCommits}
  )(Commit)
