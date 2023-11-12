import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: String,
  date: String,
  link: String,
  image: String,
  createdDate: {
    type: Date,
    default: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000),
  },
});

export const hiruNewsModel = mongoose.model("HiruNews", NewsSchema);
export const deranaNewsModel = mongoose.model("DeranaNews", NewsSchema);
export const itnNewsModel = mongoose.model("ITNNews", NewsSchema);
export const sirasaNewsModel = mongoose.model("SirasaNews", NewsSchema);
export const asianMirrorNewsModel = mongoose.model(
  "AsianMirrorNews",
  NewsSchema
);
