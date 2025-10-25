"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface IProductGridPaginationProps {
  totalPages: number;
  currentPage: number;
}

const ProductGridPagination = ({
  totalPages,
  currentPage,
}: IProductGridPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={createPageURL(i)}
              isActive={i === currentPage}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage < 3) {
        endPage = maxPagesToShow;
      } else if (currentPage > totalPages - 2) {
        startPage = totalPages - maxPagesToShow + 1;
      }

      if (startPage > 1) {
        pageNumbers.push(
          <PaginationItem key="1">
            <PaginationLink href={createPageURL(1)}>1</PaginationLink>
          </PaginationItem>,
        );
        if (startPage > 2) {
          pageNumbers.push(<PaginationEllipsis key="start-ellipsis" />);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={createPageURL(i)}
              isActive={i === currentPage}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(<PaginationEllipsis key="end-ellipsis" />);
        }
        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink href={createPageURL(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { ProductGridPagination };
