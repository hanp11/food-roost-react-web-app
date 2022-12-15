import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
  findFollowingThunk
} from "../services/follows-thunks";
import {Button, Modal} from "react-bootstrap";

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
        <Button variant="primary" onClick={handleShow}>
          {following.length}
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}

export default Following;