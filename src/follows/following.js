import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
  findFollowingThunk
} from "../services/follows-thunks";
import {Button, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

const Following = ({uid}) => {
  const {following} = useSelector((state) => state.follows);

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(findFollowingThunk(uid));
  }, []);

  return(
      <>
        <Button className="text-decoration-none p-0 m-0 pb-1 pe-1" variant="link" onClick={handleShow}>
          {following.length}
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Following</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              following && following.map((follow) =>
                <Link key={follow.followed._id} to={`/profile/${follow.followed._id}`} className="list-group-item">
                  {follow.followed.fullName} ({follow.followed.username})
                </Link>
              )
            }
            {
              (!following || following.length < 1) && (<span className="text-secondary small">No following</span>)
            }
          </Modal.Body>
        </Modal>
      </>
  )
}

export default Following;