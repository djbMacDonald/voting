class VotesController < ApplicationController
  before_action :check_user_uniq, only: [:create]

  # def create
  #   @vote = Vote.new(vote_params)
  #   Vote.save
  #   end
  # end

  # private

  # def vote_params
  #   params.require(:vote).permit(:name, :state, :city, :incident_date)
  # end
end
