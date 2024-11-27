module Customer::CustomerHelper
  def initialize; end

  def create_bought(cusEmail, cusEvent)
    bought_user = TUser.find_by(email: cusEmail)
    if bought_user
      bought = bought_user.boughts.first_or_create
      if cusEvent
        bought.events ||= []
        bought.events << cusEvent
      end
      if bought.save
        true
      else
        false
      end
    else
      false
    end
  end
end

def isSubscribed(token)
  user = TUser.find_by(email: token)
  if user
    user.update(isSubscribed: true)
    Rails.logger.info("User #{user.email} has been subscribed")
  else
    render json: { error: 'User not found' }, status: :not_found
  end
end
