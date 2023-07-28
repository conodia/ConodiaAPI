import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import ReviewValidator from "App/Validators/ReviewValidator";
import UserSetting from "App/Models/UserSetting";

export default class ReviewsController {
    public async store({ request, response, params }: HttpContextContract) {
        const data = await request.validate(ReviewValidator)
        const userSetting = await UserSetting.query().where('userId', params.id).firstOrFail()
        const review = await userSetting.related('reviews').create(data)

        return response.status(200).json({
            message: "Review created",
            review: review
        })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const review = await UserSetting.query().where('userId', params.id).firstOrFail()
        await review.related('reviews').query().where('id', params.reviewId).delete()

        return response.status(200).json({
            message: "Review deleted"
        })
    }
}
