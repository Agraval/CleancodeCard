import React from 'react';

const Tag = ({ tag, onRemoveTag }) => {
    return (
        <div className="tag">
            {tag}
            <button onClick={() => onRemoveTag(tag)}>Remove</button>
        </div>
    );
};

export default Tag;
