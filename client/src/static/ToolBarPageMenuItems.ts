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
    onCLick: () => window.location.href = `/browse-flashcard-sets`,
  },
  {
    itemName: 'My Sets',
    icon: 'pi pi-folder-open',
    onCLick: () => window.location.href = `/my-sets`,
  },
  {
    itemName: 'My Collections',
    icon: 'pi pi-bookmark',
    onCLick: () => window.location.href = `/my-collections`,
  },
  {
    itemName: 'View Hidden Flashcards',
    icon: 'pi pi-eye-slash',
    onCLick: () => window.location.href = `/view-hidden-flashcards`,
  },
  {
    itemName: 'Account Settings',
    icon: 'pi pi-cog',
    onCLick: () => window.location.href = `/account-settings`,
  },
  {
    itemName: 'Admin',
    icon: 'pi pi-lock',
    onCLick: () => window.location.href = `/admin-panel`,
  },
];

export default toolBarPageMenuItems;