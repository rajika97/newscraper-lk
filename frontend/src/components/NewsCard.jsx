import React from "react";

const NewsCard = ({ image, date, title, link }) => {
  // Function to format the date and time
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );

    // Adding 6 hours and 30 minutes to the time
    const originalTime = new Date(dateString).getTime();
    const adjustedTime = originalTime + 18 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const formattedTime = new Date(adjustedTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDate(date);

  return (
    <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-6 mb-8">
      <div className="mb-8 overflow-hidden rounded">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src={image}
            alt=""
            className="w-full h-64 object-cover rounded-lg"
          />
        </a>
      </div>
      <div>
        <h3>
          <a
            href={link}
            className="mb-2 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-black sm:text-2xl lg:text-xl xl:text-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </h3>
        {date && (
          <div className="flex items-center">
            <span className="mr-2 inline-block rounded bg-primary px-3 py-1 text-center text-sm font-semibold leading-loose text-black">
              {formattedDate}
            </span>
            <span className="inline-block rounded bg-primary px-3 py-1 text-center text-sm font-semibold leading-loose text-black">
              {formattedTime}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
