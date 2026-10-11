import {
  listarReviews,
  buscarReviewPorId,
  criarReview,
  atualizarReview,
  deletarReview,
} from "../models/reviewModel.js";

export async function getReviews(req, res) {
  const reviews = await listarReviews();
  res.json(reviews);
}

export async function getReviewById(req, res) {
  const review = await buscarReviewPorId(req.params.id);

  if (!review) {
    return res.status(404).json({
      error: "Review não encontrado",
    });
  }

  res.json(review);
}

export async function createReview(req, res) {
  const review = await criarReview({
    ...req.body,
    authorId: req.user.id,
  });

  res.status(201).json(review);
}

export async function updateReview(req, res) {
  const review = await atualizarReview(
    req.params.id,
    req.body
  );

  res.json(review);
}

export async function deleteReview(req, res) {
  await deletarReview(req.params.id);

  res.status(204).send();
}