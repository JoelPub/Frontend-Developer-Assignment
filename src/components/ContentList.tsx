import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import ContentCard from './ContentCard';
import SkeletonCard from './SkeletonCard';

import useCustomFilterGroup from './useCustomFilter';
import useContentSort from './useCustomSort';

const ITEMS_PER_PAGE = 12;

const ContentList = () => {
  const { items, loading, error } = useAppSelector((state) => state.content);
  const { filters, sorter } = useAppSelector((state) => state.filters);

  const [displayedCount, setDisplayedCount] = useState<number>(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Apply filters & sorting
  const filteredItems = useCustomFilterGroup(items, filters);
  const { sortedItems } = useContentSort(filteredItems, sorter);

  // const filteredItems = useMemo(() => {
  //   return applyFiltersAndSort(
  //     items,
  //     filters.pricingOptions,
  //     filters.keyword,
  //     filters.sortBy,
  //     filters.priceRange
  //   )
  // }, [items, filters]);

  const hasMore = useMemo(
    () => displayedCount < filteredItems.length,
    [displayedCount, filteredItems.length]
  );

  // Intersection Observer callback
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoadingMore) {
        setIsLoadingMore(true);
        // Simulate loading delay for better UX
        setTimeout(() => {
          setDisplayedCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredItems.length));
          setIsLoadingMore(false);
        }, 500);
      }
    },
    [hasMore, isLoadingMore, filteredItems.length]
  );

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    });

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [handleObserver]);

  // Reset displayed items when filters change
  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE);
  }, [filters]);

  if (loading && items.length === 0) {
    return (
      <div className="content-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Content</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="no-results">
        <h2>No Results Found</h2>
        <p>Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  const itemsToDisplay = sortedItems.slice(0, displayedCount);
  return (
    <>
      <div className="content-grid" data-testid="content-grid">
        {itemsToDisplay.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>

      {isLoadingMore && (
        <div className="loading-more">
          <p>Loading more items...</p>
        </div>
      )}

      {/* Intersection Observer target */}
      {hasMore && <div ref={observerTarget} style={{ height: '20px' }} />}
    </>
  );
};

export default ContentList;
