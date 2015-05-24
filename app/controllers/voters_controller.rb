class VotersController < ApplicationController

  def index
    @voters = Voter.all
    render json: @voters
  end

  def create
    @voter = Voter.new(vote_params)
    if @voter.save
      render json: @voter
    else
      render json: @voter.errors, status: :unprocessable_entity
    end
  end

  private

  def vote_params
    params.require(:voter).permit(:name, :googleID, :email, votes_attributes: [:candidate_id, :place])
  end
end
