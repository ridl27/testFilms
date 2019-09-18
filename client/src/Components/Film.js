import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { compose } from 'redux'
import { connect } from 'react-redux';

class Film extends Component {
    state = {
        films: this.props.films
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            films: nextProps.films
        });
    }

    handleDelete = () => {
        if (window.confirm('Are you sure? This action can not be undone.')) {
            axios.delete('/films/' + this.state.film._id).catch(function (error) {
                console.log(error);
            });
            this.props.history.push('/');
        }
    }

    render() {
        const { classes } = this.props;
        let film = this.state.films ? this.state.films.filter(film => {
            return film._id === this.props.match.params.film_id;
        })[0] : {};
        console.log(film);
        let stars = film.stars ? (film.stars.map(star => {
            return star.name
        }).join(", ")) : '';
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} gutterBottom>
                        {film.title}
                    </Typography>
                    <Typography component="p">
                        {film.year}
                    </Typography>
                    <Typography component="p">
                        {film.format}
                    </Typography>
                    <Typography component="p">
                        {stars}
                    </Typography>
                </CardContent>
                <Link to={'/'}><Button variant="outlined">Go Back</Button></Link>
                <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleDelete}>
                    Delete Movie<DeleteIcon className={classes.rightIcon} />
                </Button>
            </Card>
        )
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    card: {
        maxWidth: 275,
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    }
});

const mapStateToProps = (state) => {
    return { films: state.films }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(Film)
