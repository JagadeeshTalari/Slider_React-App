import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [articleNo, setArticleNo] = useState(0);

  useEffect(() => {
    if (articleNo > people.length - 1) {
      setArticleNo(0);
    }
    if (articleNo < 0) {
      setArticleNo(people.length - 1);
    }
  }, [articleNo, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setArticleNo(articleNo + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [articleNo]);

  return (
    <main>
      <section className="section">
        <div className="title">
          <h2>
            <span>/</span>Reviews
          </h2>
        </div>
        <section className="section-center ">
          {people.map((person, i) => {
            const { id, name, image, title, quote } = person;
            let slidePostion = "nextSlide";
            if (i === articleNo) {
              slidePostion = "activeSlide";
            }
            if (
              i === articleNo - 1 ||
              (articleNo === 0 && i === people.length - 1)
            ) {
              slidePostion = "lastSlide";
            }
            return (
              <article key={id} className={slidePostion}>
                <img className="person-img" src={image} alt={name} />
                <h4>{name}</h4>
                <p className="title">{title}</p>
                <p className="text">{quote}</p>
                <FaQuoteRight className="icon" />
              </article>
            );
          })}
          <button className="prev" onClick={() => setArticleNo(articleNo - 1)}>
            <FiChevronLeft />
          </button>
          <button className="next" onClick={() => setArticleNo(articleNo + 1)}>
            <FiChevronRight />
          </button>
        </section>
      </section>
    </main>
  );
}

export default App;
