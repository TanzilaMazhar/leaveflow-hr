// not necessarly
import React, { useState } from 'react'

function Avatar({ src, title }) {
    const [imgError, setImgError] = useState(false);

    if (!src || imgError) {
        return (
            <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-gray-400 flex items-center justify-center text-sm font-bold text-white">
                {title?.charAt(0).toUpperCase()}
            </div>
        );
    }
    console.log(src)
    return (
        <img
            src={src}
            onError={() => {
                console.log(src),
                    setImgError(true)
            }}
            className="h-8 w-8 lg:h-10 lg:w-10 rounded-full object-cover flex-shrink-0"
            alt={title}
        />
    )
}

export default Avatar