import ContentCard from './ContentCard';

const ITEMS_PER_PAGE = 12;

const ContentList = () => {
    return (
        <>
            <div className ="content-grid">
                <ContentCard />
            </div>
        </>
    );
};

export default ContentList;