import { Request, Response, NextFunction } from 'express';
import * as quoteService from '../services/quoteService';

export const getAllQuotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quotes = await quoteService.getAllQuotes();
    res.status(200).json({
      success: true,
      data: quotes
    });
  } catch (error) {
    next(error);
  }
};

export const getQuoteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const quote = await quoteService.getQuoteById(id);
    res.status(200).json({
      success: true,
      data: quote
    });
  } catch (error) {
    next(error);
  }
};

export const createQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quote = await quoteService.createQuote(req.body);
    res.status(201).json({
      success: true,
      data: quote
    });
  } catch (error) {
    next(error);
  }
};

export const analyzeQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const result = await quoteService.analyzeQuote(id);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuoteStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const quote = await quoteService.updateQuoteStatus(id, req.body);
    res.status(200).json({
      success: true,
      data: quote
    });
  } catch (error) {
    next(error);
  }
};