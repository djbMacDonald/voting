class WelcomeController < ApplicationController
  def index
    @candidates = Candidate.all
  end

  def success
    @candidates = Candidate.all
  end

  def report
    @candidates = Candidate.all
    @voters = Voter.all
    @votes = Vote.all
  end

end
