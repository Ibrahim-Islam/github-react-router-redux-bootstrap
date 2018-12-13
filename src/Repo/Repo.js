import React, { Component } from 'react';
import { Table, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './Repo.css';

class Repo extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="gh-table-body">
                <div className="container">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <a href="/">{this.props.match.params.username}</a>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Repositories</BreadcrumbItem>
                    </Breadcrumb>
                    <Table hover>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <a href="#">cli</a>
                                </th>
                                <td>This repo contains the .NET Core command-line (CLI) tools...</td>
                                <td>C#</td>
                                <td>Updated on Nov 13</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default Repo;
