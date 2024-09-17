import React, { useState } from 'react';
import JoditEditor from 'jodit-react';

const Editor = () => {
  const [content, setContent] = useState('<p>Bu bir örnek metindir.</p>');

  const config = {
    readonly: false,
    toolbar: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
    buttons: ['bold', 'italic', 'underline', 'link', 'image', 'video'],
  };

  return (
    <div>
      <JoditEditor
        value={content}
        config={config}
        tabIndex={1} // editor tabIndex
        onChange={newContent => setContent(newContent)}
      />
    </div>
  );
};

export default Editor;
