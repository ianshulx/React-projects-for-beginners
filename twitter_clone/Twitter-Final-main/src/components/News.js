import Image from "next/image";

const News = ({ article }) => {
  return (
    <div className="mb-1 border-b-2">
      <a rel="noreferrer" href={article.url} target="blank">
        <div className="flex items-center justify-between px-4  space-x-1 hover:bg-gray-200 transition duration-200">
          <div className="space-y-0.3">
            <h6 className="text-sm font-bold">{article.title}</h6>
            <p className="text-xs font-medium text-gray-500">
              {article.source.name}
            </p>
          </div>
          <img
            className="w-[70px] h-[70px] rounded-xl mb-3"
            width="70"
            height={"70"}
            src={article.urlToImage}
            alt=""
          />
        </div>
      </a>
    </div>
  );
};

export default News;
