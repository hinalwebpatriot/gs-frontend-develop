import React from "react";
import BlogArticleRow from "./BlogArticleRow";
import Pagination from "../../_common/Pagination";
import RobotPagination from "../../_common/RobotPagination";

export default class BlogArticlesList extends React.Component {
  render() {
    const { data, handleChangePage, pagination, forwardRef } = this.props;
    const articles = data.map(article => (
      <BlogArticleRow
        title={article.title}
        text={article.preview_text}
        slug={article.slug}
        image={article.image}
        date={article.date}
      />
    ));

    return (
      <div className="container" ref={forwardRef}>
        <div className="row">
          <div className="col-lg-9">{articles}</div>
        </div>
        <div className="row">
          <div className="col">
            {/*{isNextFetching && <Preloader />}*/}
            {pagination.lastPage > 1 && (
              <RobotPagination lastPage={pagination.lastPage} />
            )}
            {pagination.lastPage > 1 && (
              <section id="pagination">
                <div className="container">
                  <nav className="pagination_nav">
                    <Pagination
                      forcePage={pagination.currentPage - 1}
                      pageChange={handleChangePage}
                      lastPage={pagination.lastPage}
                    />
                  </nav>
                </div>
              </section>
              // <PaginationButton text="Load more" handleClick={handleNextPage} isFetching={isNextFetching} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
