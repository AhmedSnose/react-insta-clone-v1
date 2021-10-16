function Gallery(props) {
    return (
    <div className="gallery">

        <div className="gallery-item" tabIndex="0">

            <img src={props.postUrl} className="gallery-image" alt="" />

            <div className="gallery-item-info">

                <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 56</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 2</li>
                </ul>

            </div>

           <p className='m-4 text-center font-bold text-gray-900'>{props.caption}</p>
        </div>

    </div>
    )
}

export default Gallery
