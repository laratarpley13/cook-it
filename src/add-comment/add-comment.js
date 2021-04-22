import React, { Component } from 'react';
import Context from '../Context';
import TokenService from '../services/token-service';
import './add-comment.css';

class AddComment extends Component {
    state = {
        imageurl: "",
        comment: "",
    }

    static contextType = Context;

    logout = () => {
        TokenService.clearAuthToken();
        this.props.history.push('/')
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state.comment))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const targetRecId = parseInt(this.props.match.params.recipeId);
        const { imageurl, comment } = this.state;
        this.props.handleCommentAdd(imageurl, comment, targetRecId);
        this.props.history.push(`/recipe/${targetRecId}`);
    }

    render() {
        const { user } = this.context;
        return (
            <>
                <header className="landing-nav">
                    <h1 onClick={() => this.props.history.push('/explore')}>CookIt</h1>
                    <button onClick={() => this.props.history.push(`/user/${user.id}`)}>My Recipes</button>
                    <button onClick={() => this.props.history.push('/add-recipe')}>Add Recipe</button>
                    <button onClick={() => this.logout()}>Log Out</button>
                </header>
                <div>
                    <h2>Add Comment</h2>
                    <section className="add-comment">
                        <form onSubmit={this.handleSubmit}>
                            <p>Note: Please upload your image to<a href="https://imgur.com/" target="_blank" rel="noreferrer noopener">imgur</a>and use the image url for you recipe photo.</p>
                            <label htmlFor="imageurl">Image Url:</label>
                            <input name="imageurl" id="imageurl" type="text" value={this.state.imageurl} onChange={this.handleChange} required />
                            <br />
                            <label htmlFor="comment">Comment:</label>
                            <input name="comment" id="comment" type="text" value={this.state.comment} onChange={this.handleChange} required />
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    </section>
                </div>
            </>
        );
    }
}

export default AddComment;