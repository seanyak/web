import { useState } from 'react';
import { marked } from 'marked';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Badge from "react-bootstrap/Badge";
import './App.css';

// a heading element (H1 size), a sub heading element (H2 size), a link, inline code 
// a code block, a list item, a blockquote, an image, and bolded text

function App() {
  const [text, setText] = useState(`
  # H1
  ## H2

  [The-Ultimate-Markdown-Cheat-Sheet](https://github.com/lifeparticle/Markdown-Cheatsheet)

  \`code\`

  \`\`\`
  {
    "firstName": "John",
    "lastName": "Smith",
    "age": 25
  }
  \`\`\`

  - Item 1
  - Item 2
  - Item 3

  > blockquote

  ![alt text](image.jpg)

  **bold text**

  `);

  marked.setOptions({
    breaks: true
  })

  return (
    <div className="App">
      <div className="container">
        <div className="row mt-4">
          <div className="col text-center">
            <h1>
              <Badge className="text-align-center" variant="light">
              Markdown Previewer
              </Badge>
            </h1>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-50">
            <div className="col text-center">
              <h4>
                <Badge className="text-align-center" variant="secondary">
                  Markdown Input
                </Badge>
              </h4>
              <div className="mark-input">
                <textarea 
                className='input'
                id="editor"
                onChange={(event) => {
                  setText(event.target.value);
                  }}
                  value={text}
                  ></textarea>
                </div>
              </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-50">
            <div className="col text-center">
              <h4>
                <Badge className="text-align-center" variant="secondary">
                  Preview
                </Badge>
              </h4>
              <div id="preview"
                dangerouslySetInnerHTML={{
                  __html: marked(text),
                }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
