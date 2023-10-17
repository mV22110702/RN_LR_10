import {Listing} from "../../api/types/types";

export type BasketEntry = { id:string; chosenListing: Listing; amount: number };
