type onboardingSwiperDataType = {
    id : number,
    title : string,
    description : string,
    shortDescription : string,
    shortDescription2?  : string,
    image: any,

}


// Define the interface for the blog post structure
export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[]; // Array of strings for tags
    reactions: {
      likes: number;
      dislikes: number;
    };
    views: number;
    userId: number;
  }
  