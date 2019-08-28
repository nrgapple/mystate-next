import Router from 'next/router'

const BackButton = () => {
    return (
        <div onClick={() => Router.back()}>
            Back
        </div>
    );
};

export default BackButton;