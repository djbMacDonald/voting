class WelcomeController < ApplicationController
  before_action :authenticate_user!, only: [:report, :lock]

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
    @lock = Lock.first
  end

  def lock
    @lock = Lock.first
    @lock.status = true
    @lock.save
    redirect_to '/emily'
  end

end
