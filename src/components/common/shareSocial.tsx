import * as React from 'react';
import GenericIcons from '../../icons/generic';
import { Modal } from 'react-bootstrap';
import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	RedditShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailIcon,
	FacebookIcon,
	LinkedinIcon,
	RedditIcon,
	TelegramIcon,
	TwitterIcon,
	WhatsappIcon,
} from 'react-share';

export interface ShareSocialProps {
	title?: string;
	url: string;
	className?: string;
}

const ShareSocial: React.FC<ShareSocialProps> = props => {
	const [modal, showModal] = React.useState(false);

	return (
		<div className={`shareSocial ${props.className ? props.className : ''}`}>
			<div
				onClick={async () => {
					try {
						await navigator.share({
							title: props.title,
							url: props.url,
						});
					} catch (ex) {
						showModal(true);
					}
				}}>
				<GenericIcons name='share' />
			</div>
			<Modal
				size='lg'
				centered
				show={modal}
				keyboard={false}
				onHide={() => {
					showModal(false);
				}}>
				<Modal.Body
					style={{
						fontFamily: 'Cera Pro',
						fontSize: '16px',
						textAlign: 'center',
					}}>
					<h1 style={{ fontSize: 18 }}>Share this with your friends!</h1>

					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							margin: '2rem 0 0 1rem',
							flexWrap: 'wrap',
						}}>
						<EmailShareButton
							title={props.title}
							url={props.url}
							style={{ margin: '.2rem' }}>
							<EmailIcon path='' size={45} round={true} />
						</EmailShareButton>
						<WhatsappShareButton
							title={props.title}
							url={props.url}
							style={{ margin: '.2rem' }}>
							<WhatsappIcon path='' size={45} round={true} />
						</WhatsappShareButton>
						<FacebookShareButton
							title={props.title}
							url={props.url}
							style={{ margin: '.2rem' }}>
							<FacebookIcon path='' size={45} round={true} />
						</FacebookShareButton>
						<LinkedinShareButton
							title={props.title}
							url={props.url}
							style={{ margin: '.2rem' }}>
							<LinkedinIcon path='' size={45} round={true} />
						</LinkedinShareButton>
						<RedditShareButton
							title={props.title}
							url={props.url}
							style={{ margin: '.2rem' }}>
							<RedditIcon path='' size={45} round={true} />
						</RedditShareButton>
						<TelegramShareButton
							title={props.title}
							url={props.url}
							style={{ margin: '.2rem' }}>
							<TelegramIcon path='' size={45} round={true} />
						</TelegramShareButton>
						<TwitterShareButton
							title={props.title}
							url={props.url}
							style={{ margin: '.2rem' }}>
							<TwitterIcon path='' size={45} round={true} />
						</TwitterShareButton>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default ShareSocial;
