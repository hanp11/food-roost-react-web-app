import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {findUsersThatLikeRecipeThunk} from "../services/likes-thunks";

const DetailsLikes = ({rid}) => {
  const {likesUsers} = useSelector((state) => state.likes);

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(findUsersThatLikeRecipeThunk(rid));
  }, []);

  return(
      <>
        <Button className="text-decoration-none p-0 m-0 pb-1 pe-1" variant="link" onClick={handleShow}>
          {likesUsers.length}
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Likes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
                likesUsers && likesUsers.map((like) =>
                    <Link key={like._id} to={`/profile/${like.user._id}`} className="list-group-item">
                      {like.user.fullName} ({like.user.username})
                    </Link>
                )
            }
            {
                (!likesUsers || likesUsers.length < 1) && (<span className="text-secondary small">No likes</span>)
            }
          </Modal.Body>
        </Modal>
      </>
  )
}

export default DetailsLikes;