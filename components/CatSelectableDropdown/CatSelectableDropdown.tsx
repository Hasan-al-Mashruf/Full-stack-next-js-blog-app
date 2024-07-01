import { FC } from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../ui/MultiSelect";
import { ICategory } from "@/types/types.global";

const CatSelectableDropdown: FC<any> = ({
  categories,
  categoryHandler,
  selectedCat,
}) => {
  const { data } = categories;

  // to maintain data structure, I have used filter

  const handleCategoryChange = (values: string[]) => {
    const selectedCategories = data?.filter((category: ICategory) =>
      values.includes(category.name)
    );
    categoryHandler(selectedCategories);
  };

  return (
    <MultiSelector
      values={selectedCat.map((cat: ICategory) => cat.name)}
      onValuesChange={handleCategoryChange}
      loop={false}
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select your framework" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {data?.map((category: ICategory) => (
            <MultiSelectorItem key={category.id} value={category.name}>
              {category.name}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};

export default CatSelectableDropdown;
