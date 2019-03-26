import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, InputBase, Button, Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

class Home extends Component {
	state = {
		films: []
	}
	componentDidMount(){
		axios.get('/films').then(res => {  
			let films = res.data;
			this.setState({
				films
			});
		})
	}

	handleFilter = (e) => {
	    var table = document.getElementById('info-table');

	    var phrase = e.target.value;
	    var flag = false;
	    for (var i = 1; i < table.rows.length; i++) {
	        flag = false;
	        for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
	            flag = table.rows[i].cells[j].innerHTML.toLowerCase().indexOf(phrase) !== -1;
	            if (flag) break;
	        }
	        if (flag) {
	            table.rows[i].style.display = "";
	        } else {
	            table.rows[i].style.display = "none";
	        }
	    }
	}

    handleSort = (e) => {
        if (e.target.tagName !== 'TH') return;
        if (!e.target.hasAttribute('data-button')) return;
        
        if (e.target.getAttribute('data-sort') === null || e.target.getAttribute('data-sort') === 'down') e.target.setAttribute('data-sort', 'up');
        else e.target.setAttribute('data-sort', 'down');

        function sortGrid(colNum, type) {
            var grid = document.getElementById("info-table");
            var tbody = grid.getElementsByTagName('tbody')[0];
            var rowsArray = [].slice.call(tbody.rows);
            var compare;
              switch (type) {
                  case 'up':
                    compare = function(rowA, rowB) {
                      if (rowA.cells[colNum].outerText.toLowerCase() > rowB.cells[colNum].outerText.toLowerCase()) return 1;
                         else return -1;
                    }
                    break;
                  case 'down':
                    compare = function(rowA, rowB) {
                      if (rowA.cells[colNum].outerText.toLowerCase() < rowB.cells[colNum].outerText.toLowerCase()) return 1;
                         else return -1;
                    }
                    break;
                  default: break;
              }
            rowsArray.sort(compare);
      
            grid.removeChild(tbody);
            for (var i = 0; i < rowsArray.length; i++) {
              tbody.appendChild(rowsArray[i]);
            }
            grid.appendChild(tbody);
        }
        sortGrid(e.target.cellIndex, e.target.getAttribute('data-sort'));
    };

	render() {
		const { classes } = this.props;

		let films = this.state.films;
		// console.log(films);

		films = films.map(film => {
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
		});
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
                    <Table id="info-table" onClick={this.handleSort}>
                        <TableHead>
                            <TableRow>
                                <TableCell data-button="sort">Movie</TableCell>
                                <TableCell>Release Year</TableCell>
                                <TableCell>Format</TableCell>
                                <TableCell>Stars</TableCell>
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

export default withStyles(styles)(Home);