import React from 'react';

function EditComment() {
  return (
    <>
        <header className="landing-nav">
            <h1>CookIt</h1>
            <a href="#">My Recipes</a>
            <a href="#">Add Recipe</a>
            <a href="#">Sign Out</a>
        </header>
        <div>
            <h2>Edit Comment</h2>
            <section className="edit-comment">
                <form>
                    <label for="img-url">Image Url:</label>
                    <input name="img-url" id="img-url" type="text" />
                    <br />
                    <label for="comment">Comment:</label>
                    <input name="Comment" id="comment" type="text" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </section>
        </div>
    </>
  );
}

export default EditComment;