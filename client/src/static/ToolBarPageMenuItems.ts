// Imports
import ToolBarPageMenuItems from "../types/tool-bar-page/ToolBarPageMenuItems";

// Menu Items
const toolBarPageMenuItems: ToolBarPageMenuItems[] = [
  {
    itemName: 'Home',
    icon: 'pi pi-home',
    onCLick: () => window.location.href = `/welcome`,
  },
  {
    itemName: 'Browse Flashcard Sets',
    icon: 'pi pi-globe',
    onCLick: () => window.location.href = `/browse-flashcard-sets`,
  },
  {
    itemName: 'Create a Set',
    icon: 'pi pi-folder-plus',
    onCLick: () => window.location.href = `/my-sets/sets-editor/new`,
  },
  {
    itemName: 'My Sets',
    icon: 'pi pi-folder-open',
    onCLick: () => window.location.href = `/my-sets`,
  },
  {
    itemName: 'My Collections',
    icon: 'pi pi-bookmark-fill',
    onCLick: () => window.location.href = `/my-collections`,
  },
  {
    itemName: 'Admin Settings',
    icon: 'pi pi-cog',
    onCLick: () => window.location.href = `/admin-panel`,
  },
];

export default toolBarPageMenuItems;