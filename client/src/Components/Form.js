import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, TextField} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import axios from 'axios';

class Form extends Component {
    state = {
        title: '',
        year: '',
        format: '',
        stars: {}
	}
    handleChange = name => event => {
        if (name === 'stars') {
            this.setState({
                stars: {...this.state.stars, [event.target.id]: event.target.value}
            });
        } else {
            this.setState({
                [name]: event.target.value
            });
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let obj = {};
        for (let key in this.state) {
            obj[key] = this.state[key];
        }
        let arr = [];
        for (let key in this.state.stars) {
            arr.push({name: this.state.stars[key]});
        }
        obj.stars = arr;
        axios.post('/films', obj).catch(function (error) {
            console.log(error);
        });
        this.props.history.push('/');
	};

    render() {       
        return (
            <MuiThemeProvider theme={theme}>
                <>
                    <h2>Fill in the Form or upload the file (.txt)</h2>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Movie"
                            value={this.state.title}
                            onChange={this.handleChange('title')}
                            variant="outlined"
                            style={{margin: 15}}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Release Year"
                            value={this.state.year}
                            onChange={this.handleChange('year')}
                            variant="outlined"
                            style={{margin: 15}}
                            inputProps={{ pattern: "(19[4-9][0-9])|(20[0-1][0-9])" }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Format"
                            value={this.state.format}
                            onChange={this.handleChange('format')}
                            variant="outlined"
                            style={{margin: 15}}
                        />
                        <TextField
                            required
                            id='0'
                            label="Star 1"
                            onChange={this.handleChange('stars')}
                            variant="outlined"
                            style={{margin: 15}}
                        />
                        <TextField
                            required
                            id='1'
                            label="Star 2"
                            onChange={this.handleChange('stars')}
                            variant="outlined"
                            style={{margin: 15}}
                        />
                        <TextField
                            required
                            id='2'
                            label="Star 3"
                            onChange={this.handleChange('stars')}
                            variant="outlined"
                            style={{margin: 15}}
                        />
                        <br/>
                        <Button
                            color="primary"
                            style={{margin: 15}}
                            type="submit"
                            variant="contained">
                            Submit
                        </Button>
                    </form>

                    <form action="films/upload" method="post" encType="multipart/form-data" style={{margin: 15}}>
                        <input type="file" name="upload"/>
                        <Button type="submit" variant="contained" color="primary">Send</Button>
                    </form>
                    <Link to={'/'}><Button variant="outlined">Go Back</Button></Link>
                </>
            </MuiThemeProvider>
        )
    }
}

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
      },
    palette: {
      primary: green,
    },
  });

export default Form