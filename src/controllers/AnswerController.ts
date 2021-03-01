import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {

  //http://localhost:3333/answers/2?u=69e5ec87-7b82-44f9-af88-02f06a7673f0
  /**
   * Route params => Parametros que compõe  rota
   * routes.get("/ansers/:value")
   * 
   * Query Params => Busca, Paaginação, não obrigatórios
   * ?
   * chave=valor
   * ?u=...
   */
  async execute(request: Request, response: Response){
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    });

    if(!surveyUser){
      throw new AppError("Survey User does not exists!");
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.status(200).json(surveyUser);

  }
}

export { AnswerController }