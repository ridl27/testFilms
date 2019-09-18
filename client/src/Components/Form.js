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
        stars: {},
        numOfFields: '',
        file: null
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
        axios.post('/films', this.state).catch(function (error) {
            console.log(error);
        });
        this.setState({title: '', year: '', format: '', stars: {}, numOfFields: ''});
        alert("Successfully added!");
    };
    handleCheckExt = (e) => {
        if(document.getElementById('uploadFile').upload.value.lastIndexOf(".txt") === -1) {
            alert("Please upload only .txt extention file");
            document.getElementById('uploadFile').upload.value = '';
            return;
        }
        this.setState({file: e.target.files[0]});
    } 
    handleUpload = (e) => {
        e.preventDefault();
        if(e.target.upload.value === '') {
            alert("Please upload .txt extention file"); 
            return;
        }
        let formData = new FormData();
        formData.append('file', this.state.file);
        let config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post('/films/upload', formData, config).catch(function (error) {
            console.log(error);
        });
        e.target.upload.value = '';
        alert("Successfully uploaded!");
    } 

    render() {       
        var fields = [];
        for (let i=0; i<this.state.numOfFields; i++){
            fields.push(
                <TextField
                    required
                    label={`Star ${i+1}`}
                    id={i.toString()}
                    onChange={this.handleChange('stars')}
                    variant="outlined"
                    style={{margin: 15}}
                    key={i}
                />
            );
        }
        return (
            <MuiThemeProvider theme={theme}>
                <>
                    <h2>Fill in the Form or upload the file (.txt)</h2>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <TextField
                            required
                            label="Movie"
                            value={this.state.title}
                            onChange={this.handleChange('title')}
                            variant="outlined"
                            style={{margin: 15}}
                        />
                        <TextField
                            required
                            label="Release Year"
                            value={this.state.year}
                            onChange={this.handleChange('year')}
                            variant="outlined"
                            style={{margin: 15}}
                            inputProps={{ pattern: "(19[4-9][0-9])|(20[0-1][0-9])" }}
                        />
                        <TextField
                            required
                            label="Format"
                            value={this.state.format}
                            onChange={this.handleChange('format')}
                            variant="outlined"
                            style={{margin: 15}}
                        />
                        <TextField
                            required
                            label="Number of Stars"
                            type="number"
                            value={this.state.numOfFields}
                            onChange={this.handleChange('numOfFields')}
                            variant="outlined"
                            style={{margin: 15}}
                        />
                        {fields}
                        <br/>
                        <Button
                            color="primary"
                            style={{margin: 15}}
                            type="submit"
                            variant="contained">
                            Submit
                        </Button>
                    </form>

                    <form id="uploadFile" name="uploadFile" action="films/upload" method="post" encType="multipart/form-data" style={{margin: 15}} onSubmit={this.handleUpload}>
                        <input type="file" name="upload" onChange={this.handleCheckExt}/>
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