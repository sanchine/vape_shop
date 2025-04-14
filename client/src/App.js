import { useState } from "react";
import "./App.css";
import { CatalogPage } from "./components/CatalogPage/CatalogPage";
import { AdminPage } from "./components/AdminPage/AdminPage";

function App() {
  const [currentPage, setCurrentPage] = useState("Каталог");

  const pages = ["Каталог", "О нас", "Контакты"]; //, 'Админка', 'VapeParser']

  const RenderPage = ({ page }) => {
    switch (page) {
      case "Каталог": {
        return <CatalogPage />;
      }
      case "Админка": {
        return <AdminPage />;
      }
      default:
        break;
    }
  };

  return (
    <div className="App">
      
      <header>
        <nav class="navbar navbar-expand-lg border border-bottom-primary">
          <div class="container-fluid">
            <h2><a class="navbar-brand" href="#">
            Chameleon
            </a></h2>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                  {pages.map((p) => {
                  if (p !== currentPage)
                    return (
                      <li
                        class="nav-item"
                        onClick={() => setCurrentPage(p)}
                      >
                        <a class="nav-link">{p}</a>
                      </li>
                    );
                  return (
                    <li
                      class="nav-item"
                      onClick={() => setCurrentPage(p)}
                    >
                      <a class="nav-link active">{p}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div class="border mt-2">
        <RenderPage page={currentPage} />
      </div>
    </div>
  );
}

export default App;
