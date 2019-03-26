import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, Card, CardContent, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

class Film extends Component {
    state = {
		film: {}
	}
    componentDidMount(){
		axios.get('/films/'+ this.props.match.params.film_id).then(res => { 
            let film = res.data[0];
			this.setState({
				film
			});
		})
    }
    
    handleDelete = () => {
        axios.delete('/films/'+ this.state.film._id).catch(function (error) {
            console.log(error);
        });
        this.props.history.push('/');
    }

    render() {
        const { classes } = this.props;
        let stars = this.state.film.stars ? ( this.state.film.stars.map(star => {
            return star.name
        }).join(", ")) : '';
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} gutterBottom>
                        {this.state.film.title}
                    </Typography>
                    <Typography component="p">
                        {this.state.film.year}
                    </Typography>
                    <Typography component="p">
                        {this.state.film.format}
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

export default withStyles(styles)(Film)