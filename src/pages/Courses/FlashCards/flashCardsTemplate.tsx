import {
  useCompletedCards,
  useCompletedCategories,
  useFlashcardCategoryDetails,
  useIncompleteCards,
  useIncompleteCategories,
} from "../../../store/reduxHelpers/flashCards";

// FlashcardCategoryComponent displays the details of a specific flashcard category
export const FlashcardCategoryComponent = ({ language, category }) => {
  const categoryDetails = useFlashcardCategoryDetails(language, category);
  const completedCards = useCompletedCards(language, category);
  const incompleteCards = useIncompleteCards(language, category);

  return (
    <div>
      <h1>{categoryDetails.heading}</h1>
      <p>Completed Cards: {completedCards.length}</p>
      <p>Incomplete Cards: {incompleteCards.length}</p>
    </div>
  );
};

// FlashcardCategoriesComponent displays the completed and incomplete categories
export const FlashcardCategoriesComponent = ({ language }) => {
  const completedCategories = useCompletedCategories(language);
  const incompleteCategories = useIncompleteCategories(language);

  return (
    <div>
      <h1>Completed Categories</h1>
      {completedCategories.map((category, index) => (
        <div key={index}>
          <h2>{category.heading}</h2>
        </div>
      ))}
      <h1>Incomplete Categories</h1>
      {incompleteCategories.map((category, index) => (
        <div key={index}>
          <h2>{category.heading}</h2>
        </div>
      ))}
    </div>
  );
};
