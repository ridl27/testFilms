import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, InputBase, Button, Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import { connect } from 'react-redux';

class Home extends Component {
    state = {
        initialFilms: this.props.films,
        films: this.props.films,
        reverse: false
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            initialFilms: nextProps.films,
            films: nextProps.films,
        });
    }

    handleSort = (field) => () => {
        let { films: currentFilms, reverse } = this.state;
        let films = currentFilms.sort(function (a, b) {
            if (a[field].toString().toLowerCase() > b[field].toString().toLowerCase()) {
                if (!reverse) { return 1; } else {
                    return -1;
                }
            }
            if (a[field].toString().toLowerCase() < b[field].toString().toLowerCase()) {
                if (reverse) { return 1; } else {
                    return -1;
                }
            }
            return 0;
        });
        if (this.state.reverse) { this.setState({ reverse: false }); } else { this.setState({ reverse: true }); }
        this.setState({ films });
    };

    handleFilter = (e) => {
        var updatedList = this.state.initialFilms;
        updatedList = updatedList.filter(function (film) {
            return film.title.toLowerCase().search(
                e.target.value.toLowerCase()) !== -1;
        });
        this.setState({ films: updatedList });
    }

    render() {
        const { classes } = this.props;
        let films = this.state.films;
        console.log(films);
        films = films ? films.map(film => {
            let stars = film.stars.map(star => {
                return star.name
            })
            return (
                <TableRow key={film._id}>
                    <TableCell component="th" scope="row">
                        <Link to={'/' + film._id}>{film.title}</Link>
                    </TableCell>
                    <TableCell>{film.year}</TableCell>
                    <TableCell>{film.format}</TableCell>
                    <TableCell>{stars.join(", ")}</TableCell>
                </TableRow>
            )
        }) : null;
        return (
            <div className="App">
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <div className={classes.search}>
                                <InputBase
                                    onChange={this.handleFilter}
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
                            <Link to={'/add_film'}>
                                <Button variant="outlined" className={classes.button}>Add Movie</Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell onClick={this.handleSort('title')}>Movie</TableCell>
                                <TableCell onClick={this.handleSort('year')}>Release Year</TableCell>
                                <TableCell onClick={this.handleSort('format')}>Format</TableCell>
                                <TableCell onClick={this.handleSort('stars')}>Stars</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {films}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 3,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    button: {
        margin: theme.spacing.unit,
    }
});

const mapStateToProps = (state) => {
    return { films: state.films }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(Home)