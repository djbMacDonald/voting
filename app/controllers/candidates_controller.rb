class CandidatesController < ApplicationController

  def create
    @candidate = Candidate.new(cand_params)
    if @candidate.save
      render json: @candidate
    else
      render json: @candidate.errors, status: :unprocessable_entity
    end
  end

  private

  def cand_params
    params.require(:candidate).permit(:name, :blurb)
  end
end
