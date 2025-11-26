import { ContentItem, PricingOption } from '../types';

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard = ({ item }: ContentCardProps) => {
  const getPricingDisplay = () => {
    switch (item.pricingOption) {
      case PricingOption.PAID:
        return <span className="content-card-pricing pricing-paid">${item.price}</span>;
      case PricingOption.FREE:
        return <span className="content-card-pricing pricing-free">Free</span>;
      case PricingOption.VIEW_ONLY:
        return <span className="content-card-pricing pricing-view-only">View Only</span>;
      default:
        return null;
    }
  };
  return (
    <div className="content-card">
      <img src={item.photo} alt={item.title} className="content-card-image" loading="lazy" />
      <div className="content-card-body">
        <div className="content-card-user">{item.userName}</div>
        <h3 className="content-card-title">{item.title}</h3>
        <div className="content-card-footer">{getPricingDisplay()}</div>
      </div>
    </div>
  );
};

export default ContentCard;
