// Imports
import ToolBarPageMenuItems from "../types/tool-bar-page/ToolBarPageMenuItems";

// Menu Items
const toolBarPageMenuItems: ToolBarPageMenuItems[] = [
  {
    itemName: 'Welcome!',
    icon: 'pi pi-home',
    onCLick: () => window.location.href = `/welcome`,
  },
  {
    itemName: 'Browse Flashcard Sets',
    icon: 'pi pi-globe',
    onCLick: () => {},
  },
  {
    itemName: 'My Sets',
    icon: 'pi pi-folder-open',
    onCLick: () => {},
  },
  {
    itemName: 'Collections',
    icon: 'pi pi-bookmark',
    onCLick: () => {},
  },
  {
    itemName: 'View Hidden Flashcards',
    icon: 'pi pi-eye-slash',
    onCLick: () => {},
  },
  {
    itemName: 'Account Settings',
    icon: 'pi pi-cog',
    onCLick: () => {},
  },
  {
    itemName: 'Admin',
    icon: 'pi pi-lock',
    onCLick: () => {},
  },
];

export default toolBarPageMenuItems;