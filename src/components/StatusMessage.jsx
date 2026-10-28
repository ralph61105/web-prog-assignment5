function StatusMessage({ status, message }) {
    return (
        <p className={status === 'error' ? 'status error' : 'status'} role="status" aria-live="polite">
            {message}
        </p>
    );
}

export default StatusMessage;
