import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
  findFollowersThunk,
} from "../services/follows-thunks";
import {Button, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

const Followers = ({uid}) => {
  const {followers} = useSelector((state) => state.follows);

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(findFollowersThunk(uid));
  }, []);

  return(
      <>
        <Button className="text-decoration-none p-0 m-0 pb-1 pe-1" variant="link" onClick={handleShow}>
          {followers.length}
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Followers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
                followers && followers.map((follow) =>
                    <Link to={`/profile/${follow.follower._id}`} className="list-group-item">
                      {follow.follower.fullName} ({follow.follower.username})
                    </Link>
                )
            }
            {
              (!followers || followers.length < 1) && (<span className="text-secondary small">No followers</span>)
            }
          </Modal.Body>
        </Modal>
      </>
  )
}

export default Followers;