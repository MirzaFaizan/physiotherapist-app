import React from 'react';
import { Modal } from 'react-bootstrap';

export default function Model(props) {
	const { show, title, children, handleClose } = props;
	return (
		// <div className="modal fade" id={id} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		// 	<div className="modal-dialog modal-dialog-centered" role="document" style={{ minWidth: width }}>
		// 		<div className="modal-content" style={{ minHeight: height }}>
		// 			<div className="modal-header p-2 border-0 text-center">
		// 				<div className="col-sm-11 text-center">
		// 					<h5 className="modal-title">{props.title}</h5>
		// 				</div>
		// 				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
		// 					<span aria-hidden="true">&times;</span>
		// 				</button>
		// 			</div>
		// 			<div className="modal-body p-1">{props.children}</div>
		// 		</div>
		// 	</div>
		// </div>

		<Modal show={show} onHide={handleClose} animation={true} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	);
}
