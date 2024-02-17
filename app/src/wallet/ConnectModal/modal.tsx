import { FC, PropsWithChildren } from 'react';
import ReactModal from 'react-modal';

export const ConnectModalInner: FC<
    PropsWithChildren<{ onClose: () => void; isOpen: boolean }>
> = ({ children, onClose, isOpen }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onAfterOpen={() => {
                document.querySelector('html').style.overflow = 'hidden';
            }}
            onRequestClose={() => {
                onClose();
            }}
            onAfterClose={() => {
                document.querySelector('html').style.overflow = 'auto';
            }}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            shouldFocusAfterRender={true}
            shouldReturnFocusAfterClose={true}
            style={{
                overlay: {
                    backgroundColor: '',
                    backdropFilter: 'blur(8px)',
                    zIndex: 99,
                },
                content: {
                    width: '100%',
                    // Search Menu Width
                    maxWidth: '370px',
                    height: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    // marginTop: 'auto',
                    background: 'transparent',
                    border: 'none',
                    padding: '4px',
                    // inset: 'auto',
                    inset: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            }}
        >
            {children}
        </ReactModal>
    );
};
