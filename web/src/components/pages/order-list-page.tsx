"use client";
import { IPaginationDefault } from "@/src/interface/IPaginationDefault";
import { MainContainer } from "../containers/main-container";
import { Section } from "../sections/section";
import { HighLightTitle } from "../sections/titles/highlight-title";
import { Subtitle } from "../sections/titles/subtitle";
import { paginationDefault } from "@/src/helpers/pagination-default";
import { useEffect, useState } from "react";
import { OrderList } from "../orders/order-list-main";
import { ProductGridPagination } from "../paginations/product-grid-pagination";
import { useOrderListQuery } from "@/src/hooks/queries/useOrderListQuery";
import { useSearchParams } from "next/navigation";

import { useTranslation } from "react-i18next";
import { LoadingState } from "../loading-state";

const OrderListPage = () => {
  const { t } = useTranslation(["orders", "common"]);
  const searchParams = useSearchParams();
  const [pagination, setPagination] =
    useState<IPaginationDefault>(paginationDefault());
  const { data, isLoading, isError } = useOrderListQuery(pagination);
  const page = searchParams.get("page") ?? "1";

  useEffect(() => {
    const currentPage = parseInt(page);
    const limit = pagination.limit;
    const offset = (currentPage - 1) * limit + 1;
    setPagination((prev) => ({ ...prev, currentPage, offset }));
  }, [page, pagination.limit]);

  if (isLoading) {
    return <MainContainer><LoadingState messageKey="list.loading" ns="orders" /></MainContainer>;
  }

  return (
    <MainContainer>
      <Section>
        <HighLightTitle>{t("list.title")}</HighLightTitle>
        <Subtitle>{t("list.subtitle")}</Subtitle>
      </Section>
      <hr />
      {isError && <div>{t("list.error")}</div>}
      <div className="mt-8">
        {data && <OrderList orders={data.data ?? []} />}
      </div>
      <footer className="mt-12">
        {data && data.pagination && (
          <ProductGridPagination
            totalPages={data.pagination.totalPages}
            currentPage={pagination.currentPage}
          />
        )}
      </footer>
    </MainContainer>
  );
};

export { OrderListPage };
