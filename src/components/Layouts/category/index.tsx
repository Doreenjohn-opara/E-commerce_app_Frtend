import { categories } from "../../../pages/Home/categoryList/CategoryList";

const Category = () => {
  return (
    <>
      <div className="col-md-3">
        <ul
          className="categories-list"
          style={{
            listStyle: "none",
            margin: 0,
            backgroundColor: "#240C41",
            color: "#fff",
            borderRadius: "8px",
            padding: "15px",
          }}>
          {categories.map((category, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "3px 0",
                fontSize: "1.3rem",
                cursor: "pointer",
              }}>
              <span
                style={{
                  marginRight: "15px",
                  fontSize: "1.4rem",
                  display: "flex",
                  alignItems: "center",
                }}>
                {category.icon}
              </span>
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Category;