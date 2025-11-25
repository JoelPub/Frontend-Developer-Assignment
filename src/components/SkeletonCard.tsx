const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image"/>
            <div className="skeleton-body">
                <div className="skeleton-text short"/>
                <div className="skeleton-text long"/>
                <div className="skeleton-text long"/>
            </div>
        </div>
    );
};

export default SkeletonCard;